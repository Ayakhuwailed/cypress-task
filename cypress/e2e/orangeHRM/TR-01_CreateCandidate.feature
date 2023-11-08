Feature: Candidate Page
  Background:
    Given User Navigate to Candidate Page

  Scenario: Add Candidate
    When User Fills The Inputs
    And Click On Save Button
    Then User Should Navigate To Recruitment Page

