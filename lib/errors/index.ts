export class AppError extends Error {
    constructor(
        public message: string,
        public status: number = 500,
        public code?: string
    ) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class NotFoundError extends AppError {
    constructor(resource: string) {
        super(`${resource} not found`, 404, 'NOT_FOUND');
    }
}

export class ValidationError extends AppError {
    constructor(message: string) {
        super(message, 400, 'VALIDATION_ERROR');
    }
}

export class AIError extends AppError {
    constructor(message: string = 'Failed to generate content with AI') {
        super(message, 502, 'AI_ERROR');
    }
}
