import axios from 'axios';
import { UseFormSetValue, FieldValues } from 'react-hook-form';
import AsyncSelect from 'react-select/async';

interface SelectOption {
    value: string;
    label: string;
}
interface City {
    _id: number;
    שם_ישוב: string;
    סמל_ישוב: number;
    טבלה: string;
    שם_ישוב_לועזי: string;
}
interface SelectProps {
    setFormValue?: UseFormSetValue<FieldValues>
}
function SearchSelect(props: SelectProps): JSX.Element {
    const filterCities = async (inputValue: string) => {
        const res = await axios.get("https://data.gov.il/api/3/action/datastore_search?resource_id=d4901968-dad3-4845-a9b0-a57d027f11ab&");
        const cities = (res.data.result.records as City[]).map(i => ({ label: i.שם_ישוב, value: i.שם_ישוב }));
        return cities.filter((c) =>
            c.label.includes(inputValue)
        );
    };

    const loadOptions = (
        inputValue: string,
        callback: (options: SelectOption[]) => void
    ) => {
        if (inputValue.length > 0) {
            filterCities(inputValue)
                .then(res => callback(res));
        }
        else callback([]);
    };

    return (
        <div className="SearchSelect">
            <AsyncSelect
                styles={{
                    control: (baseStyles) => ({
                        ...baseStyles,
                        padding: '0.5rem',
                        marginTop: '1rem'
                    }),
                    menu: baseStyle => ({ ...baseStyle, zIndex: 9999 })
                }}
                onChange={(e) => { if (e.value) props.setFormValue("city", e.value) }}
                cacheOptions
                loadOptions={loadOptions}
                defaultOptions
                required
                backspaceRemovesValue
                isClearable
                isSearchable
                closeMenuOnSelect
                closeMenuOnScroll
                hideSelectedOptions
                isRtl
                placeholder="עיר למשלוח*"
                menuPosition='absolute'
            />
        </div>
    );
}

export default SearchSelect;
