"""More migrations

Revision ID: 908000652c0f
Revises: b87f35d7c725
Create Date: 2024-11-07 00:19:08.884661

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '908000652c0f'
down_revision = 'b87f35d7c725'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('exam_results', schema=None) as batch_op:
        batch_op.add_column(sa.Column('doctor_feedback', sa.Text(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('exam_results', schema=None) as batch_op:
        batch_op.drop_column('doctor_feedback')

    # ### end Alembic commands ###