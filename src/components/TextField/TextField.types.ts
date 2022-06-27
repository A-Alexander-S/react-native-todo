export type TextFieldProps = {
  onSubmit?: (test: string) => void,
  initialValue?: string,
  onChangeText?: (text: string) => void
}