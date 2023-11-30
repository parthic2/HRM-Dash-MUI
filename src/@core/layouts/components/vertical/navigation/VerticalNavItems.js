// ** Custom Menu Components
import VerticalNavLink from './VerticalNavLink'
import VerticalNavSectionTitle from './VerticalNavSectionTitle'

const getUserRole = () => {
  const userString = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null;

  if (!userString) {
    return null;
  }

  return userString.role;
};

const resolveNavItemComponent = item => {
  if (item.sectionTitle) return VerticalNavSectionTitle

  return VerticalNavLink
}

const filterNavigationByRole = (navigation, role) => {
  console.log(role)

  return navigation.filter(item => {
    return !item.roles || item.roles.includes(role);
  });
}

const VerticalNavItems = props => {
  // ** Props
  const { verticalNavItems } = props
  const role = getUserRole();

  const filteredNavItems = filterNavigationByRole(verticalNavItems, role);

  const RenderMenuItems = filteredNavItems?.map((item, index) => {
    const TagName = resolveNavItemComponent(item)

    return <TagName {...props} key={index} item={item} />
  })

  return <>{RenderMenuItems}</>
}

export default VerticalNavItems
