import { SearchOutlined } from '@ant-design/icons';
import { AutoComplete, Input, Space, Typography } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { actions } from '../state';
import { actions as userActions } from '../../user/state';

export default function SearchInput() {
  // @ts-ignore
  const keyword = useSelector((state) => state.search.keyword);
  const dispatch = useDispatch();
  function setKeyword(value) {
    if (value !== keyword) {
      dispatch(actions.setValue('keyword', value));
      dispatch(actions.fetchAutoComplete(value));
    }
  }
  // @ts-ignore
  const autoCompletes = useSelector((state) => state.search.autoCompletes);
  const history = useHistory();
  function gotoUser(value) {
    const user = autoCompletes.find(item => item.name === value);
    if (user) {
      dispatch(userActions.setValue('user', user));
      history.push(`/user/${user.name}`);
    }
  }
  return (
    <AutoComplete
      value={keyword}
      onChange={setKeyword}
      onSelect={gotoUser}
      style={{ width: '100%' }}
      options={autoCompletes.map((item) => ({
        value: item.name,
        label: (
          <Space>
            <Typography.Text strong>{item.name}</Typography.Text>
            <Typography.Text type='secondary'>
              {item.department}
            </Typography.Text>
            <Typography.Text>{item.tag}</Typography.Text>
          </Space>
        ),
      }))}
      autoFocus
    >
      <Input
        size='large'
        placeholder='검색어를 입력하세요'
        prefix={<SearchOutlined />}
      />
    </AutoComplete>
  );
}
