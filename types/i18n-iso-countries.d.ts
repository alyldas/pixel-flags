declare module "i18n-iso-countries" {
  type NameSelection = "official" | "alias" | "all";

  interface Countries {
    registerLocale(locale: unknown): void;
    getNames(
      locale: string,
      options?: {
        select?: NameSelection;
      }
    ): Record<string, string>;
  }

  const countries: Countries;
  export default countries;
}
