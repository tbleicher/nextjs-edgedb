CREATE MIGRATION m17tw657ltfr7rbh7lqlg7vtb6citxzfovpfqusa5qsdlurobvzf3a
    ONTO m1f5jkhzvtevmz3ky7jmjvd4ly7btvzoh6y5njuklvvr2efunepktq
{
  ALTER TYPE default::Todo {
      CREATE REQUIRED PROPERTY created_at -> std::datetime {
          SET default := (std::datetime_current());
      };
  };
};
