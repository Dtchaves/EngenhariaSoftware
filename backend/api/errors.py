from flask import jsonify
from app.constants import BAD_REQUEST_CODE, UNAUTHORIZED_CODE, FORBIDDEN_CODE, NOT_FOUND_CODE, SERVER_ERROR_CODE

class AppError(Exception):
    """Base class for all application errors"""
    def __init__(self, message, status_code):
        super().__init__(message)
        self.message = message
        self.status_code = status_code

    def to_response(self):
        return jsonify({'error': self.message}), self.status_code

class BadRequestError(AppError):
    def __init__(self, message='Bad Request'):
        super().__init__(message, BAD_REQUEST_CODE)

class UnauthorizedError(AppError):
    def __init__(self, message='Unauthorized'):
        super().__init__(message, UNAUTHORIZED_CODE)

class ForbiddenError(AppError):
    def __init__(self, message='Forbidden'):
        super().__init__(message, FORBIDDEN_CODE)

class NotFoundError(AppError):
    def __init__(self, message='Not Found'):
        super().__init__(message, NOT_FOUND_CODE)

class InternalServerError(AppError):
    def __init__(self, message='Internal Server Error'):
        super().__init__(message, SERVER_ERROR_CODE)
