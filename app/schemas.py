from pydantic import BaseModel, EmailStr, ConfigDict
from datetime import datetime
from typing import Optional


class ParticipantBase(BaseModel):
    name: str


class ParticipantCreate(ParticipantBase):
    exclude_participant_name: Optional[str] = None


class ParticipantOut(ParticipantBase):
    token: str
    revealed: bool = False
    model_config = ConfigDict(from_attributes=True)


class ParticipantMatchOut(BaseModel):
    assigned_to: str


class ParticipantMatchIn(BaseModel):
    token: str


class GroupBase(BaseModel):
    name: str
    budget: int


class GroupCreate(GroupBase):
    participants: list[ParticipantCreate]


class GroupOut(GroupBase):
    token: str
    participants: list[ParticipantOut]
    model_config = ConfigDict(from_attributes=True)
