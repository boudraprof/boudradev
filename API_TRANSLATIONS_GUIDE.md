# API Translations Guide

## Overview

All API routes now support localized error and success messages based on the user's language preference (detected from `Accept-Language` header).

## Translation Files

API messages are stored in:
- `messages/en.json` - English translations
- `messages/ar.json` - Arabic translations

Under the `api` key:
```json
{
  "api": {
    "errors": {
      "tokenRequired": "Token is required",
      "serverError": "Server configuration error",
      "recaptchaFailed": "reCAPTCHA verification failed",
      "internalError": "Internal server error",
      "invalidRequest": "Invalid request",
      "unauthorized": "Unauthorized access",
      "notFound": "Resource not found",
      "validationError": "Validation error"
    },
    "success": {
      "recaptchaVerified": "reCAPTCHA verified successfully",
      "requestProcessed": "Request processed successfully"
    }
  }
}
```

## Usage Examples

### Method 1: Direct Usage (Current Implementation)

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getLocaleFromRequest, getApiMessages } from '@/lib/api-translations';

export async function POST(request: NextRequest) {
  try {
    // Get locale from request
    const locale = getLocaleFromRequest(request);
    const apiMessages = await getApiMessages(locale);

    // Use translated messages
    if (!token) {
      return NextResponse.json(
        { success: false, error: apiMessages.errors.tokenRequired },
        { status: 400 }
      );
    }

    // Success response
    return NextResponse.json({ 
      success: true,
      message: apiMessages.success.recaptchaVerified
    });
  } catch (error) {
    const locale = getLocaleFromRequest(request);
    const apiMessages = await getApiMessages(locale);
    
    return NextResponse.json(
      { success: false, error: apiMessages.errors.internalError },
      { status: 500 }
    );
  }
}
```

### Method 2: Using Helper Functions

```typescript
import { NextRequest } from 'next/server';
import { createErrorResponse, createSuccessResponse } from '@/lib/api-response';

export async function POST(request: NextRequest) {
  try {
    if (!token) {
      return await createErrorResponse(request, 'tokenRequired', 400);
    }

    // Success response
    return await createSuccessResponse(
      request,
      { data: result },
      'recaptchaVerified'
    );
  } catch (error) {
    return await createErrorResponse(request, 'internalError', 500);
  }
}
```

## Available Helper Functions

### `getLocaleFromRequest(request: NextRequest)`
Detects user's preferred language from `Accept-Language` header.
Returns: `'en' | 'ar'`

### `getApiMessages(locale: 'en' | 'ar')`
Loads API translation messages for the specified locale.
Returns: Promise with all API messages

### `createErrorResponse(request, errorKey, status)`
Creates a localized error response.
- `request`: NextRequest object
- `errorKey`: Key from `api.errors` object
- `status`: HTTP status code (default: 400)

### `createSuccessResponse(request, data?, messageKey?)`
Creates a localized success response.
- `request`: NextRequest object
- `data`: Optional data to include in response
- `messageKey`: Optional key from `api.success` object

## Adding New API Messages

1. Add the message key to both `messages/en.json` and `messages/ar.json`:

**English (`messages/en.json`):**
```json
{
  "api": {
    "errors": {
      "myNewError": "My new error message"
    },
    "success": {
      "myNewSuccess": "Operation completed successfully"
    }
  }
}
```

**Arabic (`messages/ar.json`):**
```json
{
  "api": {
    "errors": {
      "myNewError": "رسالة الخطأ الجديدة"
    },
    "success": {
      "myNewSuccess": "تمت العملية بنجاح"
    }
  }
}
```

2. Use in your API route:
```typescript
const apiMessages = await getApiMessages(locale);
return NextResponse.json({
  success: false,
  error: apiMessages.errors.myNewError
});
```

## Language Detection

The system automatically detects the user's preferred language from:
1. `Accept-Language` HTTP header
2. Falls back to default locale (`en`) if not specified

The detection considers language quality values (q-values) in the Accept-Language header to select the best match.

## Example API Route

See `src/app/api/verify-recaptcha/route.ts` for a complete implementation example.

