"use client";

import { AnimatePresence, motion, useAnimate } from "motion/react";
import { useActionState, useEffect } from "react";
import { MorphText } from "@/components/motion/morph-text";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { spring } from "@/lib/motion";
import { signIn, type SignInState } from "./actions";

const initialState: SignInState = { error: null, attempt: 0 };

export function LoginForm() {
  const [state, action, pending] = useActionState(signIn, initialState);
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (state.attempt === 0 || !scope.current) return;
    animate(
      scope.current,
      { x: [0, -10, 9, -7, 5, -2, 0] },
      { duration: 0.45, ease: "easeOut" }
    );
  }, [state.attempt, animate, scope]);

  return (
    <form
      ref={scope}
      action={action}
      className="space-y-4 rounded-card bg-surface p-6 shadow-lift sm:p-7"
    >
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          autoFocus
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
      </div>

      <AnimatePresence initial={false}>
        {state.error && (
          <motion.p
            key={state.error}
            role="alert"
            className="text-[14px] text-danger"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={spring}
          >
            {state.error}
          </motion.p>
        )}
      </AnimatePresence>

      <Button type="submit" pending={pending} className="w-full">
        <MorphText text={pending ? "Signing in…" : "Sign in"} />
      </Button>
    </form>
  );
}
