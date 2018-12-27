Feature: /ping

Scenario: Ping 👍🏼
  Given a config key version = "some-version"
  When GET /ping
  Then the response is 200 and the payload at version is "some-version"

Scenario: Ping auth 👍🏼
  Given a config key version = "some-version"
  And a user A
  When GET /ping-with-user as A
  Then the response is 200 and the payload at version is "some-version"

Scenario: Ping auth without user 👎🏼
  Given a config key version = "some-version"
  When GET /ping-with-user
  Then the response is 401 and the payload at error is "NEEDS_AUTH"
