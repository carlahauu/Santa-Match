def test_get_participant_invalid_token(client):
    response = client.get("/participants/this-token-does-not-exist")
    assert response.status_code == 404
    assert (
        response.json()["detail"]
        == "Participant was not found with token: this-token-does-not-exist"
    )


def test_get_participant(client, standard_payload):
    payload = standard_payload

    new_group = client.post("/groups", json=payload)

    group = client.get(f"/groups/{new_group.json()['token']}")

    participants = group.json()["participants"]

    for participant in participants:
        response = client.get(f"/participants/{participant["token"]}")
        assert len(response.json()['name']) > 0


def test_reveal_match_assigned_to(client, standard_payload):
    payload = standard_payload

    new_group = client.post("/groups", json=payload)

    group = client.get(f"/groups/{new_group.json()['token']}")

    participants = group.json()["participants"]

    for participant in participants:
        participant_revealed = client.post(
            f"/participants/reveal/{participant['token']}"
        )
        assert len(participant_revealed.json()["assigned_to"]) > 0


def test_reveal_match_invalid_token(client):
    response = client.post("/participants/reveal/this-token-does-not-exist")
    assert response.status_code == 404
    assert (
        response.json()["detail"]
        == "Participant was not found with token: this-token-does-not-exist"
    )


def test_reveal_match(client, standard_payload):
    payload = standard_payload

    new_group = client.post("/groups", json=payload)

    group = client.get(f"/groups/{new_group.json()['token']}")

    participants = group.json()["participants"]

    for participant in participants:
        participant_revealed = client.post(
            f"/participants/reveal/{participant['token']}"
        )
        assert participant_revealed.status_code == 200
        assert len(participant_revealed.json()["assigned_to"]) >= 1

    updated_group = client.get(f"/groups/{new_group.json()['token']}")
    updated_participants = updated_group.json()["participants"]

    for participant in updated_participants:
        assert participant["revealed"] == True


def test_reveal_match_reveal_twice(client, standard_payload):
    payload = standard_payload

    new_group = client.post("/groups", json=payload)

    group = client.get(f"/groups/{new_group.json()['token']}")

    participants = group.json()["participants"]

    for participant in participants:
        participant_revealed = client.post(
            f"/participants/reveal/{participant['token']}"
        )
        assert participant_revealed.status_code == 200
        second_participant_revealed = client.post(
            f"/participants/reveal/{participant['token']}"
        )
        assert second_participant_revealed.status_code == 403
        assert (
            "match has already been viewed. Match can only be viewed once."
            in second_participant_revealed.json()["detail"]
        )
