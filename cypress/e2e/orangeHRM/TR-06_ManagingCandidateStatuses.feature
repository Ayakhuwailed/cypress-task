Feature:TR-06 - Managing Candidate Statuses

  Scenario: #1 - Add Candidate
    Given User Navigate to Candidate Page
    When User Fills The Inputs
    And Clicks On Save Button
    Then The User Should Navigate To Recruitment Page
    And The Candidate should Move to the "Application Initiated" Status
    And The User "Should" See the Following Buttons:
      | buttonName |
      | Shortlist  |
      | Reject     |
    And The User "Shouldn't" See the Following Buttons:
      | buttonName            |
      | Schedule Interview    |
      | Mark Interview Failed |
      | Mark Interview Passed |
      | Offer Job             |
      | Hire                  |
      | Offer Declined        |

  Scenario: #2 - Application Initiated candidate - Reject candidate
    Given The System has Candidate With "Application Initiated" Status
    When The Admin Opens the Application Stage Page
    And The User Clicks on "Reject" Button
    And Submit the "Reject" Form
    Then The Candidate should Move to the "Rejected" Status
    And The User "Shouldn't" See the Following Buttons:
      | buttonName            |
      | Shortlist             |
      | Reject                |
      | Schedule Interview    |
      | Mark Interview Failed |
      | Mark Interview Passed |
      | Offer Job             |
      | Hire                  |
      | Offer Declined        |

  Scenario: #3 - Application Initiated candidate - Shortlist candidate
    Given The System has Candidate With "Application Initiated" Status
    When The Admin Opens the Application Stage Page
    And The User Clicks on "Shortlist" Button
    And Submit the "Shortlist" Form
    Then The Candidate should Move to the "Shortlisted" Status
    And The User "Should" See the Following Buttons:
      | buttonName         |
      | Reject             |
      | Schedule Interview |
    And The User "Shouldn't" See the Following Buttons:
      | buttonName            |
      | Shortlist             |
      | Mark Interview Failed |
      | Mark Interview Passed |
      | Offer Job             |
      | Hire                  |
      | Offer Declined        |

  Scenario: #4 - Shortlisted - Reject candidate
    Given The System has Candidate With "Shortlisted" Status
    When The Admin Opens the Application Stage Page
    And The User Clicks on "Reject" Button
    And Submit the "Reject" Form
    Then The Candidate should Move to the "Rejected" Status
    And The User "Shouldn't" See the Following Buttons:
      | buttonName            |
      | Shortlist             |
      | Reject                |
      | Schedule Interview    |
      | Mark Interview Failed |
      | Mark Interview Passed |
      | Offer Job             |
      | Hire                  |
      | Offer Declined        |

  Scenario: #5 - First Interview Scheduled - Shortlist Status
    Given The System has Candidate With "Shortlisted" Status
    When The Admin Opens the Application Stage Page
    And The User Clicks on "Schedule Interview" Button
    And Submit the "Schedule Interview" Form
    Then The Candidate should Move to the "Interview Scheduled" Status
    And The User "Should" See the Following Buttons:
      | buttonName            |
      | Reject                |
      | Mark Interview Failed |
      | Mark Interview Passed |
    And The User "Shouldn't" See the Following Buttons:
      | buttonName         |
      | Shortlist          |
      | Schedule Interview |
      | Offer Job          |
      | Hire               |
      | Offer Declined     |

  Scenario: #6 - First Interview Scheduled - Reject Candidate
    Given The System has Candidate With "Schedule First Interview" Status
    When The Admin Opens the Application Stage Page
    And The User Clicks on "Reject" Button
    And Submit the "Reject" Form
    Then The Candidate should Move to the "Rejected" Status
    And The User "Shouldn't" See the Following Buttons:
      | buttonName            |
      | Shortlist             |
      | Reject                |
      | Schedule Interview    |
      | Mark Interview Failed |
      | Mark Interview Passed |
      | Offer Job             |
      | Hire                  |
      | Offer Declined        |

  Scenario Outline: #<tc> - First Interview Scheduled -  Mark Interview <process>
    Given The System has Candidate With "Schedule First Interview" Status
    When The Admin Opens the Application Stage Page
    And The User Clicks on "<movedStatus>" Button
    And Submit the "<movedStatus>" Form
    Then The Candidate should Move to the "<afterStatus>" Status
    And The User "<reject>" See the "Reject" Button
    And The User "<scheduleInterview>" See the "Schedule Interview" Button
    And The User "<offerJob>" See the "Offer Job" Button
    And The User "Shouldn't" See the Following Buttons:
      | buttonName            |
      | Shortlist             |
      | Mark Interview Failed |
      | Mark Interview Passed |
      | Hire                  |
      | Offer Declined        |
    Examples:
      | tc | process | movedStatus           | afterStatus      | reject | scheduleInterview | offerJob  |
      | 7  | Failed  | Mark Interview Failed | Interview Failed | Should | Shouldn't         | Shouldn't |
      | 8  | Passed  | Mark Interview Passed | Interview Passed | Should | Should            | Should    |

  Scenario Outline: #<tc> - First Interview <process> - Reject Candidate
    Given The System has Candidate With "<status>" Status
    When The Admin Opens the Application Stage Page
    And The User Clicks on "Reject" Button
    And Submit the "Reject" Form
    Then The Candidate should Move to the "Rejected" Status
    And The User "Shouldn't" See the Following Buttons:
      | buttonName            |
      | Shortlist             |
      | Reject                |
      | Schedule Interview    |
      | Mark Interview Failed |
      | Mark Interview Passed |
      | Offer Job             |
      | Hire                  |
      | Offer Declined        |
    Examples:
      | tc | process | status                 |
      | 9  | Failed  | First Interview Failed |
      | 10 | Passed  | First Interview Passed |

  Scenario Outline: #11 - First Interview Passed - Offer Job
    Given The System has Candidate With "First Interview Passed" Status
    When The Admin Opens the Application Stage Page
    And The User Clicks on "Offer Job" Button
    And Submit the "Offer Job" Form
    Then The Candidate should Move to the "Job Offered" Status
    And The User "Should" See the Following Buttons:
      | buttonName     |
      | Reject         |
      | Hire           |
      | Offer Declined |
    And The User "Shouldn't" See the Following Buttons:
      | buttonName            |
      | Shortlist             |
      | Schedule Interview    |
      | Mark Interview Failed |
      | Mark Interview Passed |
      | Offer Job             |

  Scenario: #12 - First Interview Passed - Schedule Second Interview
    Given The System has Candidate With "First Interview Passed" Status
    When The Admin Opens the Application Stage Page
    And The User Clicks on "Schedule Interview" Button
    And Submit the "Schedule Interview" Form
    Then The Candidate should Move to the "Interview Scheduled" Status
    And The User "Should" See the Following Buttons:
      | buttonName            |
      | Reject                |
      | Mark Interview Failed |
      | Mark Interview Passed |
    And The User "Shouldn't" See the Following Buttons:
      | buttonName         |
      | Shortlist          |
      | Schedule Interview |
      | Offer Job          |
      | Hire               |
      | Offer Declined     |

  Scenario: #13 - Second Interview Schedule - Reject Candidate
    Given The System has Candidate With "Schedule Second Interview" Status
    When The Admin Opens the Application Stage Page
    And The User Clicks on "Reject" Button
    And Submit the "Reject" Form
    Then The Candidate should Move to the "Rejected" Status
    And The User "Shouldn't" See the Following Buttons:
      | buttonName            |
      | Shortlist             |
      | Reject                |
      | Schedule Interview    |
      | Mark Interview Failed |
      | Mark Interview Passed |
      | Offer Job             |
      | Hire                  |
      | Offer Declined        |

  Scenario Outline: #<tc> - Second Interview Schedule - Mark Interview <process>
    Given The System has Candidate With "Schedule Second Interview" Status
    When The Admin Opens the Application Stage Page
    And The User Clicks on "<status>" Button
    And Submit the "<status>" Form
    Then The Candidate should Move to the "<assertionStatus>" Status
    And The User "<reject>" See the "Reject" Button
    And The User "<offerJob>" See the "Offer Job" Button
    And The User "shouldn't" See the "Schedule Interview" Button
      | buttonName            |
      | Shortlist             |
      | Schedule Interview    |
      | Mark Interview Failed |
      | Mark Interview Passed |
      | Hire                  |
      | Offer Declined        |
    Examples:
      | tc | process | status                | assertionStatus  | reject | offerJob  |
      | 14 | Failed  | Mark Interview Failed | Interview Failed | Should | Shouldn't |
      | 15 | Passed  | Mark Interview Passed | Interview Passed | Should | Should    |

  Scenario Outline: #<tc> - Second Interview <process> - Reject Candidate
    Given The System has Candidate With "<status>" Status
    When The Admin Opens the Application Stage Page
    And The User Clicks on "Reject" Button
    And Submit the "Reject" Form
    Then The Candidate should Move to the "Rejected" Status
    And The User "Shouldn't" See the Following Buttons:
      | buttonName            |
      | Shortlist             |
      | Reject                |
      | Schedule Interview    |
      | Mark Interview Failed |
      | Mark Interview Passed |
      | Offer Job             |
      | Hire                  |
      | Offer Declined        |
    Examples:
      | tc | process | status                  |
      | 16 | Passed  | Second Interview Passed |
      | 17 | Failed  | Second Interview Failed |

  Scenario Outline: #18 - Job Offered after Passed First Interview - Reject Candidate
    Given The System has Candidate With "Job Offered after Passed First Interview" Status
    When The Admin Opens the Application Stage Page
    And The User Clicks on "Reject" Button
    And Submit the "Reject" Form
    Then The Candidate should Move to the "Rejected" Status
    And The User "Shouldn't" See the Following Buttons:
      | buttonName            |
      | Shortlist             |
      | Reject                |
      | Schedule Interview    |
      | Mark Interview Failed |
      | Mark Interview Passed |
      | Offer Job             |
      | Hire                  |
      | Offer Declined        |

  Scenario Outline: #<tc> - Job Offered after Passed First Interview - <process>
    Given The System has Candidate With "Job Offered after Passed First Interview" Status
    When The Admin Opens the Application Stage Page
    And The User Clicks on "<process>" Button
    And Submit the "<status>" Form
    Then The Candidate should Move to the "<assertionStatus>" Status
    And The User "<reject>" See the "Reject" Button
    And The User "Shouldn't" See the Following Buttons:
      | buttonName            |
      | Shortlist             |
      | Schedule Interview    |
      | Mark Interview Failed |
      | Mark Interview Passed |
      | Offer Job             |
      | Hire                  |
      | Offer Declined        |
    Examples:
      | tc | process       | status        | assertionStatus | reject    |
      | 19 | Offer Decline | Offer Decline | Offer Declined  | Should    |
      | 20 | Hire          | Hired         | Hired           | Shouldn't |

  Scenario Outline: #21 - Job Offered after Passed Second Interview - Reject Candidate
    Given The System has Candidate With "Job Offered after Passed Second Interview" Status
    When The Admin Opens the Application Stage Page
    And The User Clicks on "Reject" Button
    And Submit the "Reject" Form
    Then The Candidate should Move to the "Rejected" Status
    And The User "Shouldn't" See the Following Buttons:
      | buttonName            |
      | Shortlist             |
      | Reject                |
      | Schedule Interview    |
      | Mark Interview Failed |
      | Mark Interview Passed |
      | Offer Job             |
      | Hire                  |
      | Offer Declined        |

  Scenario Outline: #<tc> - Job Offered after Passed Second Interview - <process>
    Given The System has Candidate With "Job Offered after Passed Second Interview" Status
    When The Admin Opens the Application Stage Page
    And The User Clicks on "<process>" Button
    And Submit the "<status>" Form
    Then The Candidate should Move to the "<assertionStatus>" Status
    And The User "<reject>" See the "Reject" Button
    And The User "Shouldn't" See the Following Buttons:
      | buttonName            |
      | Shortlist             |
      | Schedule Interview    |
      | Mark Interview Failed |
      | Mark Interview Passed |
      | Offer Job             |
      | Hire                  |
      | Offer Declined        |
    Examples:
      | tc | process       | status        | assertionStatus | reject    |
      | 22 | Offer Decline | Offer Decline | Offer Declined  | Should    |
      | 23 | Hire          | Hired         | Hired           | Shouldn't |

  Scenario Outline: #<tc> - Offer Declined after Passed <interview> Interview - Reject Candidate
    Given The System has Candidate With "<status>" Status
    When The Admin Opens the Application Stage Page
    And The User Clicks on "Reject" Button
    And Submit the "Reject" Form
    Then The Candidate should Move to the "Rejected" Status
    And The User "Shouldn't" See the Following Buttons:
      | buttonName            |
      | Shortlist             |
      | Schedule Interview    |
      | Mark Interview Failed |
      | Mark Interview Passed |
      | Offer Job             |
      | Hire                  |
      | Offer Declined        |
    Examples:
      | tc | interview | status                                           |
      | 24 | First     | Declined Job Offer after Passed First Interview  |
      | 25 | Second    | Declined Job Offer after Passed Second Interview |

  Scenario Outline: #<tc> - Check the "Reject" Button Action - "<status>"
    Given The System has Candidate With "<status>" Status
    When The Admin Opens the Application Stage Page
    And The User Clicks on "Reject" Button
    Then The "Reject Candidate" Page should Open
    Examples:
      | tc | status                                    |
      | 26 | Application Initiated                     |
      | 27 | Shortlisted                               |
      | 28 | Schedule First Interview                  |
      | 29 | First Interview Failed                    |
      | 30 | First Interview Passed                    |
      | 31 | Schedule Second Interview                 |
      | 32 | Second Interview Failed                   |
      | 33 | Second Interview Passed                   |
      | 34 | Job Offered after Passed First Interview  |
      | 35 | Job Offered after Passed Second Interview |

  Scenario: #36 - Check the "Shortlist" Button Action - "<status>"
    Given The System has Candidate With "Application Initiated" Status
    When The Admin Opens the Application Stage Page
    And The User Clicks on "Shortlist" Button
    Then The "Shortlist Candidate" Page should Open

  Scenario Outline: #<tc> - Check the "Schedule Interview" Button Action - "<status>"
    Given The System has Candidate With "<status>" Status
    When The Admin Opens the Application Stage Page
    And The User Clicks on "Schedule Interview" Button
    Then The "Schedule Interview" Page should Open
    Examples:
      | tc | status                 |
      | 37 | Shortlisted            |
      | 38 | First Interview Passed |

  Scenario Outline: #<tc> - Check the "Mark Interview Passed" Button Action - "<status>"
    Given The System has Candidate With "<status>" Status
    When The Admin Opens the Application Stage Page
    And The User Clicks on "Mark Interview Passed" Button
    Then The "Mark Interview Passed" Page should Open
    Examples:
      | tc | status                    |
      | 39 | Schedule First Interview  |
      | 40 | Schedule Second Interview |

  Scenario Outline: #<tc> - Check the "Mark Interview Failed" Button Action - "<status>"
    Given The System has Candidate With "<status>" Status
    When The Admin Opens the Application Stage Page
    And The User Clicks on "Mark Interview Failed" Button
    Then The "Mark Interview Failed" Page should Open
    Examples:
      | tc | status                    |
      | 41 | Schedule First Interview  |
      | 42 | Schedule Second Interview |

  Scenario Outline: #<tc> - Check the "Offer Job" Button Action - "<status>"
    Given The System has Candidate With "<status>" Status
    When The Admin Opens the Application Stage Page
    And The User Clicks on "Offer Job" Button
    Then The "Offer Job" Page should Open
    Examples:
      | tc | status                  |
      | 43 | First Interview Passed  |
      | 44 | Second Interview Passed |

  Scenario Outline: #<tc> - Check the "Offer Declined" Button Action - "<status>"
    Given The System has Candidate With "<status>" Status
    When The Admin Opens the Application Stage Page
    And The User Clicks on "Offer Declined" Button
    Then The "Decline Offer" Page should Open
    Examples:
      | tc | status                                    |
      | 45 | Job Offered after Passed First Interview  |
      | 46 | Job Offered after Passed Second Interview |

  Scenario Outline: #<tc> - Check the "Hire" Button Action - "<status>"
    Given The System has Candidate With "<status>" Status
    When The Admin Opens the Application Stage Page
    And The User Clicks on "Hire" Button
    Then The "Hire Candidate" Page should Open
    Examples:
      | tc | status                                    |
      | 47 | Job Offered after Passed First Interview  |
      | 48 | Job Offered after Passed Second Interview |