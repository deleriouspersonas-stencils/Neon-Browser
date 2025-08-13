export interface Credentials {
  endpoint: string;
  sessionKey: string;
}

export interface ToolSettings {
  downloadAccelerator: boolean;
  protocolInjection: boolean;
  sandboxOverride: boolean;
  memoryCloaking: boolean;
  transactionSplicer: boolean;
  rngOverride: boolean;
  certificateForgery: boolean;
  cspNeutralizer: boolean;
}