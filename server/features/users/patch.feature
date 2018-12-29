Feature: PATCH /api/v0/users

Background:
  Given a user A

Scenario: Update user
  When PATCH /api/v0/users as A with payload
    """
    {
      "name": "CASLA",
      "phone": "1234123"
    }
    """
  Then the response is 200
  And the document for user A at name is "CASLA"


Scenario: Update email user 👎🏼
  When PATCH /api/v0/users as A with payload
    """
    {
      "email": "some@email.com"
    }
    """
  Then the response is 400 and the payload at error is "INVALID_PAYLOAD"
