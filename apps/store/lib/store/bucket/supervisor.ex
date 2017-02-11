defmodule Store.Bucket.Supervisor do
  use Supervisor

  def start_link(items) do
    Supervisor.start_link(__MODULE__, items)
  end

  def init(items) do
    children = [
      worker(Store.Bucket, [Store.Bucket, items], restart: :permanent)
    ]

    supervise(children, strategy: :one_for_one)
  end
end
