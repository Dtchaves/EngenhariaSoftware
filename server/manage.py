from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand
from app import app, db
from flask.cli import with_appcontext
import click

migrate = Migrate(app, db)

@click.command(name='db')
@with_appcontext
def db_command():
    """Run database migrations."""
    from flask_migrate.cli import db
    db()

app.cli.add_command(db_command)

if __name__ == '__main__':
    app.run()