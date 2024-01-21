declare module "react" {
  function forwardRef<T, P = {}>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_ORIGIN: string;
      API_PREFIX: string;
    }
  }
}

export {};
