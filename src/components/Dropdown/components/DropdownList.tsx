import React, { useCallback, useEffect, useState } from 'react';
import cyrillicToTranslit from 'cyrillic-to-translit-js';
import styles from './DropdownList.module.scss';
import {
  DropdownInfoOption,
  DropdownNoMatchOption,
  DropdownOption,
  DropdownSelectAllOption,
} from './DropdownOptions';
import { ICity } from 'types/ICity';
import { IModel } from 'types/IModel';
import { IBrand } from 'types/IBrand';
import { IRegion } from 'types/IRegion';
type Props = {
  checkedValue: string[];
  checkboxAllowed: boolean | undefined;
  filterValue: string;
  options?: string | string[];
  optionList?: ICity[] | IModel[];
  changeOption: (option: string) => void;
  checkboxHandler: (option: string) => void;
  allOptionsLabel?: string;
  titleName?: string | string[];
  pickedBrands?: IBrand[];
  pickedRegions?: IRegion[];
};
export default function DropdownList(props: Props) {
  const {
    checkedValue,
    filterValue,
    checkboxAllowed,
    options,
    titleName,
    optionList,
    pickedBrands,
    pickedRegions,
  } = props;
  const [filtredItem, setFiltredItem] = useState<string[]>([]);
  const filterOptionsFunc = useCallback ((text: string) => {
    if (filterValue.length === 0) return true;

    const translit = cyrillicToTranslit();
    const translitUa = cyrillicToTranslit({ preset: 'uk' });

    const optionValue = text.toLowerCase();
    const checkValue = filterValue.toLowerCase().trim();

    const cyrillicPattern = /^[\u0400-\u04FF]+$/;

    if (cyrillicPattern.test(filterValue)) {
      if (optionValue.includes(checkValue)) return true;
      if (optionValue.includes(translitUa.transform(checkValue))) return true;
      return optionValue.includes(translit.transform(checkValue));
    }
    if (optionValue.includes(translit.reverse(checkValue))) return true;
    if (optionValue.includes(translitUa.reverse(checkValue))) return true;
    return optionValue.includes(checkValue);
  },[filterValue])
  useEffect(() => {
    if (typeof options !== 'string' && options !== undefined) {
      const filtredItem = options?.filter(filterOptionsFunc);
      setFiltredItem(filtredItem);
    }
  }, [options,filterOptionsFunc]);
  const filtredItems =
    optionList &&
    optionList?.map((option: any) => {
      if (option) {
        if (option.cities) {
          return option.cities
            .map((item: any) => item.city)
            .filter(filterOptionsFunc);
        } else if (option.models) {
          return option.models
            .map((item: any) => item.model)
            .filter(filterOptionsFunc);
        }
      }
      return [];
    });

  const filtredOptions = filtredItems || filtredItem;

  const regionsList: string[] = [];
  if (pickedRegions !== undefined && titleName !== undefined) {
    pickedRegions.forEach((item: any) => {
      regionsList.push(item.region);
    });
  }
  const brandList: string[] = [];
  if (titleName !== undefined && pickedBrands !== undefined) {
    pickedBrands.forEach((item: any) => {
      brandList.push(item.brand);
    });
  }
  return (
    <ul className={styles.list}>
      {checkboxAllowed && !!filtredOptions.length && (
        <>
          <DropdownInfoOption text="Обрані:" />
          <DropdownSelectAllOption {...props} />
          {checkedValue.map(currentOption => (
            <DropdownOption
              key={currentOption}
              {...props}
              currentOption={currentOption}
            />
          ))}
        </>
      )}
      {!filtredOptions.every(Array.isArray) &&
        checkboxAllowed &&
        !!filtredOptions.length && <DropdownInfoOption text={'Весь список:'} />}
      {!filtredOptions.every(Array.isArray) ? (
        filtredOptions.length === 0 ? (
          <DropdownNoMatchOption />
        ) : (
          filtredOptions
            .filter(
              (currentOption: any) => !checkedValue.includes(currentOption),
            )
            .map((currentOption: any) => (
              <DropdownOption
                {...props}
                currentOption={currentOption}
                key={currentOption.toLowerCase().trim().replaceAll(' ', '_')}
              />
            ))
        )
      ) : filtredOptions.length === 0 ? (
        <DropdownNoMatchOption />
      ) : (
        <>
          {filtredOptions.map((item: any, i: any) => (
            <React.Fragment key={'item' + i}>
              <DropdownInfoOption
                newStyles="newStyles"
                text={regionsList.length > 0 ? regionsList[i] : brandList[i]}
              />
              {item
                .filter(
                  (currentOption: any) => !checkedValue.includes(currentOption),
                )
                .map((currentOption: any, index: number) => (
                  <DropdownOption
                    {...props}
                    currentOption={currentOption}
                    key={'item' + i + '-' + index} // Используйте уникальные ключи для каждого элемента в цикле
                  />
                ))}
            </React.Fragment>
          ))}
        </>
      )}
    </ul>
  );
}
