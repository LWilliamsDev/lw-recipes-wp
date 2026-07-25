/**
 * Component for Search Input Filter
 */

interface SearchInputProps {
  label: string;
  id: string;
  placeholder: string;
  machineName: string;
  searchInputValue: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; 
  buttonText: string;
  disabled: boolean;
}

export default function SearchInput ({label, id, machineName, placeholder, searchInputValue, onChange, buttonText, disabled}: SearchInputProps){

	return (
		<>
			<label htmlFor={ machineName } className="sr-only">{ label }</label>
        <input type="text" id={id} className="rounded-sm border border-(--color-mid-green) border-solid p-2" name={ machineName } placeholder={ placeholder} value={searchInputValue} onChange={onChange} disabled={disabled} />
      <button id="listing--search" className="button p-[10px] inline-block rounded-sm text-(--color-white) font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" type="submit" disabled={disabled}>{ buttonText }</button>
		</>
		)

}
