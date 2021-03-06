module Api
  class EventsController < ApplicationController
    # load_and_authorize_resource
    # before_action :authenticate_user!
    before_action :set_event, only: [:destroy, :update]
    # before_action :authenticate_user!, except: [:index]

    def index
      render json: Event.order(sort_by + ' ' + order)
    end

    def search
      query = params[:query]
      events = Event.where('name LIKE ? OR place LIKE ? OR description LIKE ?', "%#{query}%", "%#{query}%", "%#{query}%")
      render json: events
    end

    def create
      event = Event.new(event_params)
      event.user = current_user
      if event.save
        render json: event
      else
        render nothing: true, status: :bad_request
      end
    end

    def destroy
      @event.destroy
      head :no_content
    end

    def update
      if @event.update(event_params)
        render json: @event
      else
        render nothing: true, status: :unprocessable_entity
      end

    end

    private

    def event_params
      params.require(:event).permit(:name, :description, :event_date, :place)
    end

    def set_event
      @event = Event.find(params[:id])
    end

    def sort_by
      %w(name place description event_date).include?(params[:sort_by]) ? params[:sort_by] : 'name'
    end

    def order
      %w(asc desc).include?(params[:order]) ? params[:order] : 'asc'
    end
  end
end
