export type THookSubscribeEvent = {
  list?: TResource[];
};

export type THookControl = {
  submitCopyKeyFormAction: () => Promise<undefined>;
};
