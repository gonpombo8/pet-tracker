Feature: POST /api/v0/pets

Scenario: Create Pet
  Given a user A
  When POST /api/v0/pets as A with payload
    """
    {
      "name": "Casla",
      "birthdate": 1545403748582,
      "type": "dog"
    }
    """
  Then the response is 201
  And store the response payload in R
  And the document for the pet with { "username": "${R.username}" } includes
  """
  {
    "name": "Casla",
    "birthdate": 1545403748582,
    "type": "dog"
  }
  """
