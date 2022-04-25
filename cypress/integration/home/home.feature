Feature: Login Prompt

    Scenario: User is required to log in
        Given I visit the "Home" page
        Then I should see the "Log in" dialog
        When I log in as "ada@a.example.com"
        Then I should see a "Welcome" heading

