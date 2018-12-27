Feature: POST /api/v0/users

Scenario: Sign up 👍🏼
  When POST /api/v0/users with payload
    """
    {
      "name": "Leandro Atilio",
      "surname": "Romagnoli",
      "email": "${random}@boedo.com",
      "password": "some-password"
    }
    """
  Then the response is 201
  And the response token is a valid JWT
  And the document for the user with { "email": "${random}@boedo.com" } at surname is "Romagnoli"


Scenario: Sign up without email 👎🏼
  When POST /api/v0/users with payload
    """
    {
      "name": "Leandro Atilio",
      "surname": "Romagnoli",
      "password": "some-password"
    }
    """
  Then the response is 400 and the payload at error is "INVALID_PAYLOAD"

