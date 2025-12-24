from pydantic import BaseModel, EmailStr, ConfigDict
from datetime import datetime
from typing import Optional


class ParticipantBase(BaseModel):
    name: str
    assigned_to: Optional[str] = None
    revealed: bool = False
    token: str
    exclude_participant_token: Optional[str] = None


class ParticipantCreate(BaseModel):
    name: str
    exclude_participant_name: Optional[str] = None


class ParticipantOut(BaseModel):
    name: str
    token: str
    revealed: bool = False
    model_config = ConfigDict(from_attributes=True)


class ParticipantMatchOut(BaseModel):
    assigned_to: str


class ParticipantMatchIn(BaseModel):
    token: str


class GroupBase(BaseModel):
    token: str
    name: str
    budget: int
    participants: list[ParticipantOut]


class GroupCreate(BaseModel):
    name: str
    budget: int
    participants: list[ParticipantCreate]


class GroupOut(BaseModel):
    token: str
    name: str
    budget: int
    participants: list[ParticipantOut]
    model_config = ConfigDict(from_attributes=True)
