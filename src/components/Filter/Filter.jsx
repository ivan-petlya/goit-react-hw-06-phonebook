import { useDispatch, useSelector } from 'react-redux';
import { getFilter, filterContacts } from '../../redux/contactsSlice';

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);
  const onFilterContact = event => {
    dispatch(filterContacts(event.target.value.toLowerCase()));
  };

  return (
    <div>
      <div>
        <input
          placeholder="find contact by name"
          type="text"
          name="filter"
          value={filter}
          onChange={onFilterContact}
        />
      </div>
    </div>
  );
};

export default Filter;
