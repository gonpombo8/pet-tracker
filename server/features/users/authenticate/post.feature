Feature: POST /api/v0/users/authenticate

Background:
  Given a user A
  And a password boedoescarnaval for user A


Scenario: Sign in 👍🏼
  When POST /api/v0/users/authenticate with payload
    """
    {
      "email": "${A.email}",
      "password": "boedoescarnaval"
    }
    """
  Then the response is 200
  And the response token is a valid JWT

Scenario: Sign in with invalid password 👎🏼
  When POST /api/v0/users/authenticate with payload
    """
    {
      "email": "${A.email}",
      "password": "somepassword"
    }
    """
  Then the response is 400 and the payload at error is "INVALID_PASSWORD"

Scenario: Sign in with invalid email 👎🏼
  When POST /api/v0/users/authenticate with payload
    """
    {
      "email": "some-emaiol-123213@boedo.com",
      "password": "somepassword"
    }
    """
  Then the response is 400 and the payload at error is "USER_NOT_FOUND"

Scenario: Sign in with invalid payload 👎🏼
  When POST /api/v0/users/authenticate with payload
    """
    {
      "email": "${A.username}"
    }
    """
  Then the response is 400 and the payload at error is "INVALID_PAYLOAD"
