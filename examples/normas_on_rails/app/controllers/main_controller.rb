class MainController < ApplicationController
  def index; end

  def split_field; end

  def split_field_row
    render partial: 'main/split_row'
  end

  def split_field_cell
    render partial: 'main/split_cell'
  end

  def morpheus
    render partial: 'main/morpheus', locals: { morpheus_part: 'body' }
  end
end
