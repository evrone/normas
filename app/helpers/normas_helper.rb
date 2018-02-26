module NormasHelper
  def react_component(component_name, props = nil)
    content_tag :div, '', data: { react_component: component_name, props: props }
  end
end