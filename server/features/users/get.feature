Feature: GET /api/v0/users

Scenario: Get User
  Given a user A
  When GET /api/v0/users as A
  Then the response is 200
  And the response at name is "${A.name}"
  And the response at password is undefined
