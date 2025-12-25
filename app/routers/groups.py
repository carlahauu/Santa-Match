from .. import models, schemas
from fastapi import FastAPI, Response, status, HTTPException, Depends, APIRouter
from ..database import get_db
from sqlalchemy.orm import Session
from typing import List
import random

router = APIRouter(prefix="/groups", tags=["Groups"])


@router.get("/{token}", response_model=schemas.GroupOut)
def get_group(token: str, response: Response, db: Session = Depends(get_db)):
    group = db.query(models.Group).filter(models.Group.token == token).first()

    if not group:
        response.status_code = status.HTTP_404_NOT_FOUND
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Group was not found with token: {token}",
        )

    return group


@router.post("/", status_code=status.HTTP_201_CREATED, response_model=schemas.GroupOut)
def create_group(group: schemas.GroupCreate, db: Session = Depends(get_db)):

    participant_names = [p.name.lower() for p in group.participants]

    if len(participant_names) != len(set(participant_names)):
        raise HTTPException(
            status_code=400,
            detail="Participants must have unique names within a group.",
        )

    if len(group.participants) < 3:
        raise HTTPException(
            status_code=400, detail="At least 3 participants are required."
        )

    new_group = models.Group(name=group.name, budget=group.budget)

    db.add(new_group)
    db.commit()
    db.refresh(new_group)

    pairings_finalized = False
    attempts = 0

    while not pairings_finalized:
        attempts += 1
        if attempts > 100:
            raise HTTPException(
                status_code=400,
                detail="After max attempts, we still were not able to create matches while considering exclusions.",
            )

        recipients = random.sample(group.participants, k=len(group.participants))
        is_valid = True

        for i in range(len(recipients)):
            santa = group.participants[i]
            receiver = recipients[i]
            excluded_participant = (santa.exclude_participant_name or "").strip()

            if (
                santa.name.strip() == receiver.name.strip()
                or receiver.name.strip() == excluded_participant
            ):
                is_valid = False
                break

        if is_valid:
            for i in range(len(recipients)):
                new_participant = models.Participant(
                    name=group.participants[i].name,
                    group_token=new_group.token,
                    assigned_to=recipients[i].name,
                )
                db.add(new_participant)
            db.commit()
            db.refresh(new_group)
            pairings_finalized = True

    return new_group


@router.delete("/{token}", status_code=status.HTTP_204_NO_CONTENT)
def delete_group(token: str, db: Session = Depends(get_db)):
    group_query = db.query(models.Group).filter(models.Group.token == token)

    if group_query.first() == None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Group was not found with token: {token}",
        )

    db.query(models.Participant).filter(models.Participant.group_token == token).delete(
        synchronize_session=False
    )

    group_query.delete(synchronize_session=False)
    db.commit()

    return Response(status_code=status.HTTP_204_NO_CONTENT)
