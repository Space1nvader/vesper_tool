export declare global {
  /**
   * @param className - string;
   * @param style - React.CSSProperties
   */
  type ExtendedFC = { className?: string; style?: React.CSSProperties };
  /**
   * Функциональный компонент React
   * @param className - string;
   * @param style - React.CSSProperties
   * @extends React.FC
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  type IFC<T = {}> = React.FC<ExtendedFC & T>;

  /**
   * Тип определяет тип любого из ключей интерфейса и его значения
   */
  type AnyKeyOf<T> = Partial<Record<keyof T, T[keyof T]>>;

  /**
   * Определяет пустой объект, может использоваться для параметров по умолчанию
   */
  type EmptyObject = Record<string, never>;
}

declare module '*.wav' {
  const value: any;
  export default value;
}
