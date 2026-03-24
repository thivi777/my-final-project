'use client';

import * as React from "react";

export function useToast() {
  const [state, setState] = React.useState([]);

  return { state };
}