defmodule Store.Bucket.Supervisor do
  @moduledoc"""
  Supervises Store.Bucket Agent. If Store.Bucket crashes, starts a new one.
  """
  use Supervisor

  @doc"""
  Client API method for starting for Store.Bucket.Supervisor, links to calling
  process.
  """
  def start_link(items) do
    Supervisor.start_link(__MODULE__, items)
  end

  @doc"""
  Called by Supervisor.start_link with `items` argument.
  """
  def init(items) do
    children = [
      worker(Store.Bucket, [Store.Bucket, items], restart: :permanent)
    ]

    supervise(children, strategy: :one_for_one)
  end
end
