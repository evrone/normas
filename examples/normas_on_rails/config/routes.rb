Rails.application.routes.draw do
  root 'main#index'
  get 'main/split_field'
  get 'main/split_field_row'
  get 'main/split_field_cell'
  get 'main/morpheus'
end
