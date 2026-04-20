import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export type item = {
  value: string,
  text: string
}

export type SelectBoxProp = {
  placeholder?: string,
  value?: string,
  onValueChange: (value: string) => void
  items: RescueCase[]
}

export default function SelectBox({ placeholder, items, value , onValueChange }: SelectBoxProp) {
  return <Select value={value} onValueChange={onValueChange}>
    <SelectTrigger className="w-45">
      <SelectValue placeholder="Select Rescue Case" />
    </SelectTrigger>
    <SelectContent>
      {
        items && items.map((item) => <SelectItem key={item.case_title} value={item.id.toString()}>{item.case_title}</SelectItem>)
      }
    </SelectContent>
  </Select>
}