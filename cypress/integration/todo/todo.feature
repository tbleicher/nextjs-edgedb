Feature: Todo Page

    Scenario: User is required to log in
        Given I visit the "Todos" page
        Then I should see the "Log in" dialog
        When I log in as "ada@a.example.com"
        Then I should see a "Todos" heading