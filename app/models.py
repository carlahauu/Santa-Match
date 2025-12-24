from .database import Base
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, UniqueConstraint
from sqlalchemy.sql.expression import text
from sqlalchemy.sql.sqltypes import TIMESTAMP
import secrets


class Group(Base):
    __tablename__ = "groups"
    id = Column(Integer, primary_key=True, nullable=False)
    token = Column(
        String,
        nullable=False,
        index=True,
        default=lambda: secrets.token_urlsafe(16),
    )
    budget = Column(Integer)
    name = Column(String, nullable=False)
    created_at = Column(
        TIMESTAMP(timezone=True), server_default=text("now()"), nullable=False
    )

    __table_args__ = (UniqueConstraint("token", name="uq_group_token"),)


class Participant(Base):
    __tablename__ = "participants"

    id = Column(Integer, primary_key=True, nullable=False)
    token = Column(
        String,
        nullable=False,
        index=True,
        default=lambda: secrets.token_urlsafe(16),
    )
    group_token = Column(String, ForeignKey("groups.token"), nullable=False)
    name = Column(String, nullable=False)
    assigned_to = Column(String, nullable=True)
    revealed = Column(Boolean, default=False)
    exclude_participant_token = Column(
        String, ForeignKey("participants.token"), nullable=True
    )
    created_at = Column(
        TIMESTAMP(timezone=True), server_default=text("now()"), nullable=False
    )

    __table_args__ = (UniqueConstraint("token", name="uq_participant_token"),)
