from ..models import Participant

def test_excluded_participant_not_a_partcipant(client): 
    response = client.post("/groups", json=
    {
        "name": "Test Invalid Exclude Participant", 
        "budget": 100, 
        "participants": [
            {
                "name": "Bob", "exclude_participant_name": "Alice"
            }, 
            {
                "name": "John"
            }, 
            {
                "name": "Max"
            }
        ]
    })

    assert response.status_code == 400
    assert "is not in the group:" in response.json()["detail"]

def test_update_group_name(client, standard_payload):
    new_group = client.post("/groups", json=standard_payload)
    assert new_group.status_code == 201

    response = client.put(f"/groups/{new_group.json()["token"]}", json={
        "name": "Updated Secret Santa 2025"
    })
    assert response.status_code == 200
    assert response.json()["name"] == "Updated Secret Santa 2025"

def test_update_group_budget(client, standard_payload):
    new_group = client.post("/groups", json=standard_payload)
    assert new_group.status_code == 201

    response = client.put(f"/groups/{new_group.json()["token"]}", json={
        "budget": 5
    })
    assert response.status_code == 200
    assert response.json()["budget"] == 5

def test_update_group(client, standard_payload):
    new_group = client.post("/groups", json=standard_payload)
    assert new_group.status_code == 201

    response = client.put(f"/groups/{new_group.json()["token"]}", json={
        "name": "Updated Secret Santa 2025", 
        "budget": 5
    })
    assert response.status_code == 200
    assert response.json()["budget"] == 5
    assert response.json()["name"] == "Updated Secret Santa 2025"

def test_update_invalid_group(client):
    response = client.put("/groups/this-token-does-not-exist", json={})
    assert response.status_code == 404

    data = response.json()

    assert data["detail"] == "Group was not found with token: this-token-does-not-exist"

def test_delete_group(client, standard_payload):
    new_group = client.post("/groups", json=standard_payload)
    assert new_group.status_code == 201 

    response = client.delete(f"/groups/{new_group.json()["token"]}")
    assert response.status_code == 204

    assert client.get(f"/groups/{new_group.json()["token"]}").status_code == 404


def test_delete_invalid_group(client):
    response = client.delete("/groups/this-token-does-not-exist")
    assert response.status_code == 404

    data = response.json()

    assert data["detail"] == "Group was not found with token: this-token-does-not-exist"


def test_get_group_not_found(client):
    response = client.get("/groups/this-token-does-not-exist")
    assert response.status_code == 404

    data = response.json()

    assert data["detail"] == "Group was not found with token: this-token-does-not-exist"


def test_get_group_successful(client, standard_payload):
    payload = standard_payload

    new_group = client.post("/groups", json=payload)

    response = client.get(f"/groups/{new_group.json()['token']}")

    data = response.json()

    assert response.status_code == 200

    assert data["name"] == "Secret Santa"
    assert len(data["participants"]) == 3


def test_create_group_invalid_input(client):
    payload = {
        "name": "Secret Santa",
        "budget": 100,
        "participants": [
            {"exclude_participant_name": "Bob"},
            {"name": "John"},
            {"name": "Max"},
        ],
    }

    response = client.post("/groups", json=payload)

    assert response.status_code == 422


def test_create_group_duplicate_name(client):
    payload = {
        "name": "Secret Santa",
        "budget": 100,
        "participants": [
            {"name": "Bob"},
            {"name": "Bob"},
            {"name": "Max"},
        ],
    }

    response = client.post("/groups", json=payload)
    data = response.json()

    assert response.status_code == 400
    assert data["detail"] == "Participants must have unique names within a group."


def test_create_group_no_matches_available(client):
    payload = {
        "name": "Secret Santa",
        "budget": 100,
        "participants": [
            {"name": "Bob", "exclude_participant_name": "Max"},
            {"name": "John", "exclude_participant_name": "Bob"},
            {"name": "Max", "exclude_participant_name": "Bob"},
        ],
    }

    response = client.post("/groups", json=payload)
    data = response.json()

    assert response.status_code == 400
    assert (
        data["detail"]
        == "After max attempts, we still were not able to create matches while considering exclusions."
    )


def test_create_group(client, standard_payload):
    payload = standard_payload

    response = client.post("/groups", json=payload)

    assert response.status_code == 201
    data = response.json()

    assert data["name"] == "Secret Santa"

    assert data["budget"] == 100
    assert "token" in data
    assert len(data["token"]) > 10

    assert len(data["participants"]) == 3

    names = [p["name"] for p in data["participants"]]
    assert "Bob" in names
    assert "Alice" in names
    assert "Max" in names

    for participant in data["participants"]:
        assert "token" in participant
        assert len(participant["token"]) > 10
        assert participant["revealed"] is False


def test_create_group_too_few_participants(client):
    payload = {
        "name": "Secret Santa",
        "budget": 50,
        "participants": [{"name": "Alice"}, {"name": "Bob"}],
    }
    response = client.post("/groups", json=payload)
    data = response.json()
    assert response.status_code == 400
    assert data["detail"] == "At least 3 participants are required."


def test_create_group_with_exclusions(client, db):
    payload = {
        "name": "Secret Santa 2025",
        "budget": 100,
        "participants": [
            {"name": "Bob", "exclude_participant_name": "John"},
            {"name": "Alex", "exclude_participant_name": "Max"},
            {"name": "John"},
            {"name": "Max"},
        ],
    }

    response = client.post("/groups", json=payload)
    data = response.json()
    assert response.status_code == 201
    group_token = data["token"]

    participants = (
        db.query(Participant).filter(Participant.group_token == group_token).all()
    )

    for p in participants:
        assert (
            p.assigned_to != p.name
        ), f"Matching logic failed: {p.name} was assigned to themself!"

        if p.name == "Bob":
            assert (
                p.assigned_to != "John"
            ), "Matching logic failed: Bob was assigned to John, but John should be excluded."

        if p.name == "Alex":
            assert (
                p.assigned_to != "Max"
            ), "Matching logic failed: Alex was assigned to Max, but Max should be excluded."


def test_create_group_with_uppercase_exclusions(client, db):
    payload = {
        "name": "Secret Santa 2025",
        "budget": 100,
        "participants": [
            {"name": "Bob"},
            {"name": "Alex", "exclude_participant_name": "MAX"},
            {"name": "John"},
            {"name": "Max"},
        ],
    }

    response = client.post("/groups", json=payload)
    data = response.json()
    assert response.status_code == 201
    group_token = data["token"]

    participants = (
        db.query(Participant).filter(Participant.group_token == group_token).all()
    )

    for p in participants:
        assert (
            p.assigned_to != p.name
        ), f"Matching logic failed: {p.name} was assigned to themself!"

        if p.name == "Alex":
            assert (
                p.assigned_to != "Max"
            ), "Matching logic failed: Alex was assigned to Max, but Max should be excluded."
