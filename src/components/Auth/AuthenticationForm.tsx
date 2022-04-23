import React from 'react';

import {
    Anchor, Button, Checkbox, Divider, Group, Paper, PaperProps, PasswordInput, Text, TextInput
} from '@mantine/core';
import { upperFirst, useForm, useToggle } from '@mantine/hooks';
import { UseForm } from '@mantine/hooks/lib/use-form/use-form';

import { useLoginMutation } from '../../hooks/useLoginMutation';

type AuthFormValues = {
  email: string;
  name: string;
  password: string;
  terms: boolean;
};

function AccountButtons({ form }: { form: UseForm<AuthFormValues> }) {
  const onClick = (email: string) => () => {
    form.setFieldValue("email", email);
    form.setFieldValue("password", "password");
  };

  return (
    <Group grow mb="md" mt="md">
      <Button onClick={onClick("ada@a.example.com")} radius="xl">
        Ada
      </Button>
      <Button onClick={onClick("andy@a.example.com")} radius="xl">
        Andy
      </Button>
      <Button onClick={onClick("katherine@k.example.com")} radius="xl">
        Katherine
      </Button>
      <Button onClick={onClick("betty@example.com")} radius="xl">
        Betty
      </Button>
    </Group>
  );
}

export function AuthenticationForm(props: PaperProps<"div">) {
  const { mutate: login } = useLoginMutation();

  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      terms: true,
    },

    validationRules: {
      email: (val) => /^\S+@\S+$/.test(val),
      password: (val) => val.length >= 6,
    },
  });

  // const [type, toggle] = useToggle("login", ["login", "register"]);
  const type = "login" as "login" | "register";

  const onSubmit = (data: AuthFormValues) => {
    login({ username: data.email, password: data.password });
  };

  return (
    <Paper radius="md" p="xl" withBorder {...props}>
      <Text size="lg" weight={500}>
        Welcome, {type} with as a test user
      </Text>

      <AccountButtons form={form} />

      <Divider label="Or enter credentials" labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit(onSubmit)}>
        <Group direction="column" grow>
          {type === "register" && (
            <TextInput
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) =>
                form.setFieldValue("name", event.currentTarget.value)
              }
            />
          )}

          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            error={form.errors.email && "Invalid email"}
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
            error={
              form.errors.password &&
              "Password should include at least 6 characters"
            }
          />

          {type === "register" && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) =>
                form.setFieldValue("terms", event.currentTarget.checked)
              }
            />
          )}
        </Group>

        <Group position="right" mt="xl">
          {/* <Anchor
            component="button"
            type="button"
            color="gray"
            onClick={() => toggle()}
            size="xs"
          >
            {type === "register"
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
            </Anchor> */}
          <Button type="submit">{upperFirst(type)}</Button>
        </Group>
      </form>
    </Paper>
  );
}
