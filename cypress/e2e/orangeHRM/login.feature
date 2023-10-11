Feature: Login Page

  Background:
    Given Open orangeHRM Site

  Scenario: Validate Login Page
    Then Page Should Load Successfully

  Scenario: Validate Login Button Text
    Then Page Should Contain a Button With The Text Login


  Scenario:Login With inValid Credentials
    When User Types as Following
      | Username | Password |
      | A        | admin123 |
      | Admin    | a        |
      | A        | a        |
    Then User Should See Error Message
    And User Should remain on the login page
    And Both Inputs Should Be Empty

  Scenario:Login With Empty Fields
    When User Clicks on Login Button
    Then User Should See Required Text Under Both Inputs
    And The Inputs Border Should Be Red

  Scenario:Login With Empty Username
    Given Username Input
    When User Types Valid Password
    And User Clicks on Login Button
    Then User Should See Required Text Under Username Input
    And The Username Input Border Should Be Red

  Scenario:Login With Empty Password
    Given Password Input
    When User Types Valid Username
    And User Clicks on Login Button
    Then User Should See Required Text Under Password Input
    And The Password Input Border Should Be Red


  Scenario:Login With Valid Credentials
    When User Login With Valid Credentials
    Then User Should Login Successfully and Home Page Should Load Successfully