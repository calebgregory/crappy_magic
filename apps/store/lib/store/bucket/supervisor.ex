defmodule Store.Bucket.Supervisor do
  use Supervisor

  # A simple module attribute that stores the supervisor name
  @name Store.Bucket.Supervisor

  def start_link(items) do
    Supervisor.start_link(__MODULE__, items, name: @name)
  end

  def start_bucket do
    Supervisor.start_child(@name, [])
  end

  def init(items) do
    children = [
      worker(Store.Bucket, [Store.Bucket, items], restart: :permanent)
    ]

    supervise(children, strategy: :simple_one_for_one)
  end
end
