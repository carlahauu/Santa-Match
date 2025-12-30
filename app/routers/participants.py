from .. import models, schemas
from fastapi import Response, status, HTTPException, Depends, APIRouter
from ..database import get_db
from sqlalchemy.orm import Session
from ..rate_limiting import rate_limiter

router = APIRouter(prefix="/participants", tags=["Participants"])


@router.get(
    "/{token}",
    response_model=schemas.ParticipantOut,
    dependencies=[Depends(rate_limiter)],
)
def get_participant(token: str, db: Session = Depends(get_db)):
    participant = (
        db.query(models.Participant).filter(models.Participant.token == token).first()
    )

    if not participant:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Participant was not found with token: {token}",
        )

    return participant


@router.post(
    "/reveal/{token}",
    response_model=schemas.ParticipantMatchOut,
    dependencies=[Depends(rate_limiter)],
)
def reveal_match(token: str, db: Session = Depends(get_db)):
    participant_query = db.query(models.Participant).filter(
        models.Participant.token == token
    )

    participant = participant_query.first()

    if not participant:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Participant was not found with token: {token}",
        )

    if participant.revealed == True:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"{participant.name}'s match has already been viewed. Match can only be viewed once.",
        )

    participant.revealed = True

    db.commit()
    db.refresh(participant)

    return {"assigned_to": participant.assigned_to}
