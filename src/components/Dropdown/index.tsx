import InnerDropdown from './Dropdown';
import DropdownButton from './DropdownButton';

export type DropdownInterface = typeof InnerDropdown & {
  Button: typeof DropdownButton;
};

const Dropdown = InnerDropdown as DropdownInterface;
Dropdown.Button = DropdownButton;

export default Dropdown;
