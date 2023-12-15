import {
  getInterfaceInfoByIdUsingGET,
  invokeInterfaceInfoUsingPOST
} from '@/services/yapi_backend/interfaceInfoController';
import { useParams } from '@@/exports';
import { PageContainer } from '@ant-design/pro-components';
import {Card, Descriptions, Form, message,Button,Input} from 'antd';
import React, { useEffect, useState } from 'react';

/**
 * 主页
 *
 * @constructor
 */
const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<API.InterfaceInfo>();
  // 存储结果变量
  const [invokeRes ,setInvokeRes] = useState<any>();
  // 调用加载状态变量，默认为false
  const [invokeLoading, setInvokeLoading] = useState(false);

  const params = useParams();

  const loadData = async () => {
    if (!params.id) {
      message.error('参数不存在');
      return;
    }
    //发送请求之前，loading状态改为true，表示正在加载
    setLoading(true);
    try {
      const res = await getInterfaceInfoByIdUsingGET({
        id: Number(params.id),
      });
      setData(res.data);
    } catch (error: any) {
      message.error('请求失败' + error.message);
    }
    //表示加载结束
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const onFinish= async (values: any) => {
    // 检查是否存在接口id
    if (!params.id) {
      message.error('接口不存在');
      return;
    }
    // 在开始调用接口之前，将 invokeLoading 设置为 true ，表示正在加载中
    setInvokeLoading(true);

    try {
      // 发起接口调用请求，传入一个对象作为参数，这个对象包含了id 和 values的属性，
      // 其中，id是从 params中获取的，而values 是函数的参数、
      const res = await invokeInterfaceInfoUsingPOST({
        id: params.id,
        ...values,
      });
      // 将接口调用的结果（res.data）更新到 invokeRes 状态变量中
      setInvokeRes(res.data);
      message.success('请求成功');
    } catch (error: any) {
      message.error('操作失败' + error.message);
    }
    // 无论成功或者失败，最后将 invokeLoading 设置为 false ，表示加载完成
    setInvokeLoading(false);
  };

  return (
    <PageContainer title={'查看接口文档'}>
      <Card>
        {data ? (
          <Descriptions title={data.name} column={1}>
            <Descriptions.Item label="接口状态">{data.status ? '正常' :'关闭'}</Descriptions.Item>
            <Descriptions.Item label="描述">{data.description}</Descriptions.Item>
            <Descriptions.Item label="请求地址">{data.url}</Descriptions.Item>
            <Descriptions.Item label="请求方法">{data.method}</Descriptions.Item>
            <Descriptions.Item label="请求参数">{data.requestParams}</Descriptions.Item>
            <Descriptions.Item label="请求头">{data.requestHeader}</Descriptions.Item>
            <Descriptions.Item label="响应头">{data.responseHeader}</Descriptions.Item>
            <Descriptions.Item label="创建时间">{data.createTime}</Descriptions.Item>
            <Descriptions.Item label="更新时间">{data.updateTime}</Descriptions.Item>
          </Descriptions>
        ) : (
          <>接口不存在</>
        )}
      </Card>
      <Card title="在线测试">
        <Form
          name="invoke"
          layout="vertical"
          onFinish={onFinish}
        >

          <Form.Item
            label="请求参数"
            name="userRequestParams"
          >
            <Input.TextArea/>
          </Form.Item>
          <Form.Item wrapperCol={{ span: 12}}>
            <Button type="primary" htmlType="submit">
              调用
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card title="返回结果" loading={invokeLoading}>
        {invokeRes}
      </Card>
    </PageContainer>
  );
};

export default Index;