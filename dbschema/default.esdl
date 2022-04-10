module default {
  type Todo {
    required property title -> str;
    required property completed -> bool {
      default := false;
    }
    required property created_at -> datetime {
      default := datetime_current()
    }
  }

  type Person {
    required property first_name -> str;
    required property last_name -> str;
  }

  type Movie {
    required property title -> str;
    property year -> int64;
    link director -> Person;
    multi link actors -> Person;
  }
}
