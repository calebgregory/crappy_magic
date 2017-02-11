defmodule Store.Registry do
  @moduledoc"""
  Registry maps given `id` to process id of `bucket` that holds items.
  """
  use GenServer

  @doc"""
  Starts and returns `registry`.
  """
  def start_link(name) do
    GenServer.start_link(__MODULE__, :ok, name: name)
  end

  @doc"""
  Stops the registry.
  """
  def stop(server) do
    GenServer.stop(server)
  end

  @doc"""
  Looks up the `bucket` associated with a given `id`.
  """
  def lookup(server, id) do
    GenServer.call(server, {:lookup, id})
  end

  @doc"""
  Client call to register a bucket at `id`
  """
  def create(server, id) do
    GenServer.call(server, {:create, id})
  end

  @doc"""
  Called when client calls `start_link`. Initalizes server with init_state of
  %{}.
  """
  def init(:ok) do
    buckets = %{}
    refs    = %{}
    {:ok, {buckets, refs}}
  end

  @doc"""
  Hander for `lookup`. Returns the `bucket` at that `id` (or `nil`).
  """
  def handle_call({:lookup, id}, _from, {buckets, refs}) do
    {:reply, Map.fetch(buckets, id), {buckets, refs}}
  end

  @doc"""
  Hander for `create`. Is synchronous. Registers an `id` with a `bucket`,
  monitors the `bucket` process, stores the `ref` returned by `Process.monitor`
  in `refs`. Returns `:ok`.
  """
  def handle_call({:create, id}, _from, {buckets, refs}) do
    if Map.has_key?(buckets, id) do
      {:reply, :ok, {buckets, refs}}
    else
      {:ok, pid} = Store.Bucket.Supervisor.start_bucket
      ref        = Process.monitor(pid)
      refs       = Map.put(refs, ref, id)
      buckets    = Map.put(buckets, id, pid)
      {:reply, :ok, {buckets, refs}}
    end
  end

  @doc"""
  Handles :DOWN message received from a monitored process.
  """
  def handle_info({:DOWN, ref, :process, _pid, _reason}, {buckets, refs}) do
    {id, refs} = Map.pop(refs, ref)
    buckets = Map.delete(buckets, id)
    {:noreply, {buckets, refs}}
  end

  def handle_info(_msg, state) do
    {:noreply, state}
  end
end
