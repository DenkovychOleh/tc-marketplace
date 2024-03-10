import React from 'react';
import styles from './DropdownOptions.module.scss';

type DropdownOptionProps = {
  checkboxAllowed?: boolean;
  currentOption: string;
  checkedValue: string[];
  checkboxHandler: (option: string) => void;
  changeOption: (option: string) => void;
};
export const DropdownOption = ({
  currentOption,
  checkedValue,
  checkboxAllowed,
  changeOption,
  checkboxHandler,
}: DropdownOptionProps) => {
  const clickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as typeof e.target & {
      type: string;
      innerText: string;
    };
    // if (target.type === 'checkbox') return
    changeOption(target.innerText.trim());
  };

  return (
    <li className={styles.listItem}>
      <div
        className={
          checkedValue.includes(currentOption)
            ? `${styles.listLink} ${styles.listLink_checked}`
            : styles.listLink
        }
        onClick={clickHandler}
      >
        {checkboxAllowed && (
          <input
            type="checkbox"
            checked={checkedValue.includes(currentOption)}
            onChange={() => {
              checkboxHandler(currentOption);
            }}
          />
        )}
        <span> {currentOption}</span>
      </div>
    </li>
  );
};

export const DropdownNoMatchOption = () => {
  return (
    <li className={`${styles.listItem} ${styles.listItem_Inactive}`}>
      <span className={`${styles.listLink} ${styles.listLink_inactive}`}>
        Нема співпадінь
      </span>
    </li>
  );
};
type InfoOptionProps = {
  text: string | string[];
  newStyles?:string
};

export const DropdownInfoOption = ({ text,newStyles }: InfoOptionProps) => {
  return (
    <li className={`${styles.listItem} ${styles.listItem_Inactive}`}>
      <span className={`${styles.listTitle} ${newStyles? styles.newStyles:''}`}>{text}</span>
    </li>
  );
};

type SelectAllProps = {
  checkedValue: string[];
  checkboxHandler: (option: string) => void;
  allOptionsLabel?: string;
};

export const DropdownSelectAllOption = (props: SelectAllProps) => {
  const { checkedValue, checkboxHandler, allOptionsLabel } = props;
  return (
    <li className={styles.listItem}>
      <div
        className={
          checkedValue.length === 0
            ? `${styles.listLink_checked} ${styles.listLink}`
            : styles.listLink
        }
        onClick={() => {
          checkboxHandler('none');
        }}
      >
        <input
          type="checkbox"
          checked={checkedValue.length === 0}
          onChange={() => {
            checkboxHandler('none');
          }}
        />
        <span>{allOptionsLabel ? allOptionsLabel : 'select all'}</span>
      </div>
    </li>
  );
};
