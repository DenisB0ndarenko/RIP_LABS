import Breadcrumb from 'react-bootstrap/Breadcrumb';

function MyBreadcrumb() {
    return (
        <Breadcrumb>
            <Breadcrumb.Item href="http://localhost:3000/">MyQuestHub</Breadcrumb.Item>
            <Breadcrumb.Item href="http://localhost:3000/quests/">Квесты</Breadcrumb.Item>
        </Breadcrumb>
    );
}

export default MyBreadcrumb;