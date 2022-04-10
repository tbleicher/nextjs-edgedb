CREATE MIGRATION m1f5jkhzvtevmz3ky7jmjvd4ly7btvzoh6y5njuklvvr2efunepktq
    ONTO initial
{
  CREATE TYPE default::Person {
      CREATE REQUIRED PROPERTY first_name -> std::str;
      CREATE REQUIRED PROPERTY last_name -> std::str;
  };
  CREATE TYPE default::Movie {
      CREATE MULTI LINK actors -> default::Person;
      CREATE LINK director -> default::Person;
      CREATE REQUIRED PROPERTY title -> std::str;
      CREATE PROPERTY year -> std::int64;
  };
  CREATE TYPE default::Todo {
      CREATE REQUIRED PROPERTY completed -> std::bool {
          SET default := false;
      };
      CREATE REQUIRED PROPERTY title -> std::str;
  };
};
